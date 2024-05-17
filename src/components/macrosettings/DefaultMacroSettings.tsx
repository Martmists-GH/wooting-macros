import { Divider, HStack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React from 'react'
import MultipleSetting from '../settings/MultipleSetting'
import { MacroSettingOptionDefiniton } from '../../constants/enums'
import { useMacroContext } from '../../contexts/macroContext'

export default function DefaultMacroSettings() {
  const { macro, updateMacroRecordSeqDelay, getMacroRecordSeqDelayIndex } =
    useMacroContext()

  const options = MacroSettingOptionDefiniton

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: () => updateMacroRecordSeqDelay
  })

  const group = getRootProps()

  return (
    <VStack w="full" spacing="4">
      <VStack w="full">
        <Text w="full" textStyle="miniHeader">
          Window Settings
        </Text>
      </VStack>
      <VStack w="full" spacing={[4]}>
        <HStack spacing={0}>
          <Text as="b">Record delay when recording sequence</Text>
          <HStack {...group}>
            TODO: Move options.map inside the multiple settings and only give
            options array,
            {options.map((value, index) => {
              const radio = getRadioProps({ value })
              const index_macro = getMacroRecordSeqDelayIndex(macro)
              return (
                <MultipleSetting
                  key={value}
                  value={MacroSettingOptionDefiniton[index]}
                  selectedValue={index_macro}
                  onChange={updateMacroRecordSeqDelay}
                  radio={radio}
                />
              )
            })}
          </HStack>
        </HStack>

        <Divider />
      </VStack>
    </VStack>
  )
}
