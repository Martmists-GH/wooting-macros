import {
  Box,
  HStack,
  VStack,
  Text,
  useRadio,
  useRadioGroup,
  useColorModeValue
} from '@chakra-ui/react'
import { MacroSettingOptionDefiniton } from '../../constants/enums'

interface RadioCardProps {
  value: string
  selectedValue: number
  onChange: (value: number) => void
  radio: any
}

interface RadioBoxButtonProps {
  title: string
  description: string
  onChange: (newValue: number) => void
  data: number
}

export default function MacroOverrideRadio({
  title,
  description,
  onChange,
  data: currentData
}: RadioBoxButtonProps) {
  const options = MacroSettingOptionDefiniton

  const { getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: () => onChange
  })

  return (
    <VStack w="full" spacing="0" textAlign="left">
      <Text
        as="b"
        textAlign="start"
        w="full"
        fontSize="md"
        fontWeight="semibold"
      >
        {title}
      </Text>
      <HStack spacing="2" w="full">
        <Text fontSize="sm">{description}</Text>
        <HStack marginEnd={3}>
          {options.map((value, index) => {
            const radio = getRadioProps({ value })
            return (
              <MultipleOverrideSetting
                key={value}
                value={MacroSettingOptionDefiniton[index]}
                selectedValue={currentData}
                onChange={onChange}
                radio={radio}
              />
            )
          })}
        </HStack>
      </HStack>
    </VStack>
  )
}

function MultipleOverrideSetting({
  value,
  selectedValue,
  onChange,
  radio
}: RadioCardProps) {
  const { getInputProps, getRadioProps } = useRadio({
    ...radio,
    isChecked: value === MacroSettingOptionDefiniton[selectedValue],
    onChange: () => onChange(MacroSettingOptionDefiniton.indexOf(value))
  })

  const bg = useColorModeValue('primary-light.50', 'primary-dark.700')
  const input = getInputProps()
  const checkbox = getRadioProps()
  const selectedItem = MacroSettingOptionDefiniton.indexOf(value)

  return (
    <HStack w="full" justifyContent="space-between" spacing={16}>
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderColor="gray"
          borderRadius="md"
          fontWeight="semi-bold"
          userSelect="none"
          bg={bg}
          transition="background-color 0.3s ease"
          _checked={{
            textColor: 'black',
            bg:
              selectedItem === 0
                ? 'primary-accent.600'
                : selectedItem === 1
                  ? 'red.600'
                  : 'teal.600',
            color: 'white',
            borderColor:
              selectedItem === 0
                ? 'primary-accent.600'
                : selectedItem === 1
                  ? 'red.600'
                  : 'teal.600'
          }}
          px={2}
          py={1}
        >
          {value}
        </Box>
      </Box>
    </HStack>
  )
}
