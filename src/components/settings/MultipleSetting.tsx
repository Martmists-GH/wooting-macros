import { Box, HStack, useRadio } from '@chakra-ui/react'
import { MacroSettingOptionDefiniton } from '../../constants/enums'

interface RadioCardProps {
  value: string
  selectedValue: number
  onChange: (value: number) => void
  radio: any
}

export default function MultipleSetting({
  value,
  selectedValue,
  onChange,
  radio
}: RadioCardProps) {
  console.log(
    'SELECTED:' + MacroSettingOptionDefiniton[selectedValue],
    'VALUE: ' + value
  )
  const { getInputProps, getRadioProps } = useRadio({
    ...radio,
    isChecked: value === MacroSettingOptionDefiniton[selectedValue],
    onChange: () => onChange(MacroSettingOptionDefiniton.indexOf(value))
  })

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <HStack w="full" justifyContent="space-between" spacing={16}>
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _checked={{
            bg: 'teal.600',
            color: 'white',
            borderColor: 'teal.600'
          }}
          _focus={{
            boxShadow: 'outline'
          }}
          px={2}
          py={1}
          // onClick={() => onChange(value)}

        >
          {value}
        </Box>
      </Box>
    </HStack>
  )
}
