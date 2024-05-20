import { Divider, Text, VStack } from '@chakra-ui/react'
import { useMacroContext } from '../../contexts/macroContext'
import RadioBoxButton from '../settings/MultipleSetting'

export default function DefaultMacroSettings() {
  const {} = useMacroContext()

  return (
    <VStack w="full" spacing="4">
      <VStack w="full">
        <Text w="full" textStyle="miniHeader">
          Macro recording settings
        </Text>
      </VStack>
      <VStack w="full" spacing={[4]}>
        <Divider />
      </VStack>
    </VStack>
  )
}
