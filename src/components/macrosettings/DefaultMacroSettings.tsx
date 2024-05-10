import { Divider, HStack, Text, useRadioGroup, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Macro } from '../../types'
import MultipleSetting from '../settings/MultipleSetting'

export default function DefaultMacroSettings(macro: Macro) {
  const options = ['', 'false', 'true']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log
  })

  const group = getRootProps()

  const selected = Number(macro.record_delay_sequence ?? -1) + 1

  console.log(selected)
  const [selectedValue, setSelectedValue] = useState(options[selected])

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
          <HStack>
            TODO: Move options.map inside the multiple settings and only give options array,
            {options.map((value) => {
              return (
                <MultipleSetting
                  key={value}
                  value={value}
                  selectedValue={selectedValue}
                  onChange={setSelectedValue}
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
