import {
  Box,
  Divider,
  HStack,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMacroContext } from '../../../../contexts/macroContext'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { SystemEventAction } from '../../../../types'
import { BoxText } from '../EditArea'

interface Props {
  selectedElementId: number
  selectedElement: SystemEventAction
}

export default function OsShortcutForm({
  selectedElementId,
  selectedElement
}: Props) {
  const pickerRef = useRef<HTMLDivElement | null>(null)
  const [text, setText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { updateElement } = useMacroContext()
  const { colorMode } = useColorMode()
  const bg = useColorModeValue('primary-light.50', 'primary-dark.700')
  const kebabColour = useColorModeValue('primary-light.500', 'primary-dark.500')

  return (
    <>
      <HStack justifyContent="center" p={1}>
        <BoxText>Shortcut</BoxText>
      </HStack>
      <Divider />
      <HStack w="full" justifyContent="space-between">
        <Text fontSize={['xs', 'sm', 'md']} fontWeight="semibold">
          Pick your keys
        </Text>
      </HStack>
    </>
  )
}
