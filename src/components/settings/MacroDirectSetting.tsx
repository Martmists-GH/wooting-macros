import {
  Box,
  HStack,
  VStack,
  Text,
  useRadio,
  useRadioGroup,
  useColorModeValue
} from '@chakra-ui/react'
import {
  MacroSettingDirectDefiniton,
  MacroSettingOptionDefiniton
} from '../../constants/enums'

interface RadioCardProps {
  value: string
  selectedValue: number
  onChange: (value: boolean) => void
  radio: any
}

interface RadioBoxButtonProps {
  title: string
  description: string
  onChange: (newValue: boolean) => void
  isActive: number
}

export default function MacroDirectSetting({
  title,
  description,
  onChange,
  isActive
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
              <SetSetting
                key={value}
                value={MacroSettingOptionDefiniton[index]}
                selectedValue={isActive}
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

function SetSetting({ value, selectedValue, onChange, radio }: RadioCardProps) {
  const { getInputProps, getRadioProps } = useRadio({
    ...radio,
    isChecked: value === MacroSettingDirectDefiniton[selectedValue],
    onChange: () =>
      onChange(Boolean(MacroSettingDirectDefiniton.indexOf(value)))
  })

  const bg = useColorModeValue('primary-light.50', 'primary-dark.700')
  const input = getInputProps()
  const checkbox = getRadioProps()
  const selectedItem = MacroSettingDirectDefiniton.indexOf(value)

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
