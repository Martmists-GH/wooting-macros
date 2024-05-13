import { Divider, HStack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Macro } from '../../types'
import MultipleSetting from '../settings/MultipleSetting'
import { MacroSettingOption } from "../../constants/enums";
// import { MacroSettingEnum } from "../../constants/enums";

export default function DefaultMacroSettings(macro: Macro) {
  const options = MacroSettingOption
  const selected = Number(macro.record_delay_sequence ?? -1) + 1
  const [selectedValue, setSelectedValue] = useState(options[selected])

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: setSelectedValue
  })

  const group = getRootProps()

  console.log(selectedValue)

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
            TODO: Move options.map inside the multiple settings and only give options array,
            {options.map((value) => {
              const radio = getRadioProps({value})
              return (
                <MultipleSetting
                  key={value}
                  value={value}
                  selectedValue={selectedValue}
                  onChange={setSelectedValue}
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
