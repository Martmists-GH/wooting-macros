use crate::macros::events::actions::ActionEventType;
use crate::macros::events::triggers::TriggerEventType;
use crate::macros::macro_task::MacroTaskEvent;
use crate::macros::macros::MacroType;

use tokio::sync::mpsc::UnboundedSender;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct MacroConfig {
    pub name: String,
    pub icon: String,
    pub sequence: Vec<ActionEventType>,
    pub macro_type: MacroType,
    pub trigger: TriggerEventType,
    pub enabled: bool,
    pub repeat_amount: u32,
    pub record_delay_sequence: Option<bool>,
    pub relaxed_key_trigger: bool,
}

//TODO: put the MacroConfig inside the Macro

#[derive(Debug)]
/// This is a macro struct. Includes all information a macro needs to run.
pub struct Macro {
    pub config: MacroConfig,
    pub task_sender: UnboundedSender<MacroTaskEvent>,
    pub macro_keypress_sender: UnboundedSender<rdev::EventType>,
}
