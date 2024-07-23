#[cfg(any(target_os = "windows", target_os = "linux"))]
pub mod input {
    use std::sync::Arc;

    use tokio::sync::mpsc::UnboundedSender;
    use tokio::sync::RwLock;

    use crate::grabbing::executor::input::MacroExecutorEvent;

    use crate::macros::events::triggers::TriggerEventType;
    use crate::macros::macro_data::MacroLookup;
    use crate::macros::macros::MacroType;

    pub fn check_macro_execution_simply(
        current_pressed_keys: &Vec<u32>,
        previously_pressed_keys: &Vec<u32>,
        triggers: Arc<RwLock<MacroLookup>>,
        schan_macro_execute: &UnboundedSender<MacroExecutorEvent>,
    ) -> bool {
        let mut return_value = false;
        for (macro_id, macro_data) in triggers.blocking_read().id_map.iter() {
            // Get the macro trigger
            match &macro_data.config.trigger {
                TriggerEventType::KeyPressEvent {
                    data,
                    allow_while_other_keys,
                } => {
                    match (
                        data,
                        &current_pressed_keys,
                        &previously_pressed_keys,
                        allow_while_other_keys,
                    ) {
                        // If the keys are the same, skip checking
                        (_trigger_combo, pressed, pressed_previous, _)
                            if pressed == pressed_previous
                                && macro_data.config.macro_type == MacroType::OnHold =>
                        {
                            // Consumption of the trigger key (when held)
                            return_value = false;
                        }
                        // If the keys are different and its a trigger key pressed, start a macro
                        (trigger_combo, pressed, _pressed_previous, &true)
                            if trigger_combo.iter().any(|x| pressed.contains(x)) =>
                        {
                            schan_macro_execute
                                .send(MacroExecutorEvent::Start(macro_id.clone()))
                                .unwrap();
                            // Consumption of the trigger key (when macro triggered)
                            return_value = true;
                        }
                        (trigger_combo, pressed, _pressed_previous, &false)
                            if trigger_combo.iter().all(|x| pressed.contains(x)) =>
                        {
                            schan_macro_execute
                                .send(MacroExecutorEvent::Start(macro_id.clone()))
                                .unwrap();
                            // Consumption of the trigger key (when macro triggered)
                            return_value = true;
                        }
                        // If the keys are different and its a trigger key released, stop a macro
                        (trigger_combo, _pressed, pressed_previous, &true)
                            if trigger_combo.iter().any(|x| pressed_previous.contains(x)) =>
                        {
                            schan_macro_execute
                                .send(MacroExecutorEvent::Stop(macro_id.clone()))
                                .unwrap();

                            // We don't consume the value here.
                        }
                        (trigger_combo, _pressed, pressed_previous, &false)
                            if trigger_combo.iter().all(|x| pressed_previous.contains(x)) =>
                        {
                            schan_macro_execute
                                .send(MacroExecutorEvent::Stop(macro_id.clone()))
                                .unwrap();

                            // We don't consume the value here.
                        }
                        // Anything else just ignore
                        _ => {}
                    }
                }
                TriggerEventType::MouseEvent { data } => {
                    match (data, current_pressed_keys, previously_pressed_keys) {
                        (trigger_combo, pressed, _pressed_previous)
                            if pressed.iter().all(|x: &u32| u32::from(trigger_combo) == *x) =>
                        {
                            schan_macro_execute
                                .send(MacroExecutorEvent::Start(macro_id.clone()))
                                .unwrap();
                            return_value = true;
                        }
                        _ => {}
                    }
                }
            }
        }

        return_value
    }
}
