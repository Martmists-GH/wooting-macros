import { Divider, Text, VStack } from '@chakra-ui/react'
import { useMacroContext } from '../../contexts/macroContext'
import MacroOverrideRadio from '../settings/MacroOverrideSetting'
import MacroDirectSetting from '../settings/MacroDirectSetting'

export default function DefaultMacroSettings() {
  const {
    macro,
    updateMacroRecordSeqDelay,
    getMacroRecordSeqDelayIndex,
    getAllowWhileOtherKeys,
    updateAllowWhileOtherKeys
  } = useMacroContext()

  const getAllowOtherKeysTrigger = getAllowWhileOtherKeys(macro)

  return (
    <VStack w="full" spacing="4">
      <VStack w="full">
        <Text w="full" textStyle="miniHeader">
          Macro recording settings
        </Text>
      </VStack>
      <VStack w="full" spacing={[4]}>
        <MacroOverrideRadio
          title="Record sequence delay"
          description="Record delay when recording sequence"
          onChange={updateMacroRecordSeqDelay}
          data={getMacroRecordSeqDelayIndex(macro)}
        />
        <Divider />
        {getAllowOtherKeysTrigger !== undefined && (
          <>
            <MacroDirectSetting
              title="Relaxed macro trigger"
              description="Allow macro to activate with other keys pressed"
              onChange={updateAllowWhileOtherKeys}
              isActive={getAllowOtherKeysTrigger}
            />
            <Divider />
          </>
        )}
      </VStack>
    </VStack>
  )
}
