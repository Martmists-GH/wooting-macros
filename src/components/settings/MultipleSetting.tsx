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
import { useMacroContext } from '../../contexts/macroContext'

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
}

export default function RadioBoxButton({
  title,
  description,
  onChange
}: RadioBoxButtonProps) {
  const options = MacroSettingOptionDefiniton
  const { macro, updateMacroRecordSeqDelay, getMacroRecordSeqDelayIndex } =
    useMacroContext()

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
    </VStack>
  )
}

function MultipleSetting({
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

  const kebabColour = useColorModeValue(
    'primary-accent.200',
    'primary-accent.200'
  )

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
          borderColor="gray"
          borderRadius="md"
          fontWeight="semi-bold"
          userSelect="none"
          _checked={{
            textColor: 'black',
            bg:
              MacroSettingOptionDefiniton.indexOf(value) === 0
                ? 'primary-accent.600'
                : MacroSettingOptionDefiniton.indexOf(value) === 1
                  ? 'red.600'
                  : 'teal.600',
            color: 'white',
            border: 'none'
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
