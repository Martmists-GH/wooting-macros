import { Box, HStack, Text, useRadio, VStack } from '@chakra-ui/react'

interface RadioCardProps {
  value: string
  selectedValue: string
  onChange: (value: string) => void
  radio:any
}

export default function MultipleSetting({
  value,
  selectedValue,
  onChange,
  radio
}: RadioCardProps) {
  const { getInputProps, getRadioProps } = useRadio({ ...radio})

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
          px={5}
          py={3}
          onClick={() => onChange(value)}
        >
          {value}
        </Box>
      </Box>
    </HStack>
  )
}
