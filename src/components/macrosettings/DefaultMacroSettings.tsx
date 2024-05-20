import { Divider, Text, VStack } from '@chakra-ui/react'
import { useMacroContext } from '../../contexts/macroContext'
import RadioBoxButton from '../settings/MultipleSetting'

export default function DefaultMacroSettings() {
  const { updateMacroRecordSeqDelay } = useMacroContext()

  return (
    <VStack w="full" spacing="4">
      <VStack w="full">
        <Text w="full" textStyle="miniHeader">
          Macro recording settings
        </Text>
      </VStack>
      <VStack w="full" spacing={[4]}>
        <RadioBoxButton
          title="Record sequence delay"
          description="Record delay when recording sequence"
          onChange={updateMacroRecordSeqDelay}
        />
        <Divider />
      </VStack>
    </VStack>
  )
}
