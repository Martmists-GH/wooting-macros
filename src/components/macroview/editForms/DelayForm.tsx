import {
  Divider,
  Grid,
  GridItem,
  Flex,
  Input,
  Button,
  Text
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useMacroContext } from '../../../contexts/macroContext'
import { useSelectedElement } from '../../../contexts/selectors'
import { useSettingsContext } from '../../../contexts/settingsContext'

export default function DelayForm() {
  const [delayDuration, setDelayDuration] = useState(0)
  const { selectedElementId, updateElement } = useMacroContext()
  const { config } = useSettingsContext()
  const selectedElement = useSelectedElement()

  useEffect(() => {
    if (selectedElement === undefined) {
      return
    }

    if (selectedElement.type !== 'DelayEventAction') {
      return
    }

    setDelayDuration(selectedElement.data)
  }, [selectedElement])

  const onDelayDurationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedElement === undefined || selectedElementId === undefined) {
        return
      }

      const newValue = parseInt(event.target.value)
      if (newValue === undefined) {
        return
      }

      setDelayDuration(newValue)
      const temp = { ...selectedElement }
      temp.data = newValue
      updateElement(temp, selectedElementId)
    },
    [selectedElement, selectedElementId, updateElement]
  )

  const resetDuration = useCallback(() => {
    if (selectedElement === undefined || selectedElementId === undefined) {
      return
    }
    setDelayDuration(config.DefaultDelayValue)
    const temp = { ...selectedElement }
    temp.data = config.DefaultDelayValue
    updateElement(temp, selectedElementId)
  }, [config.DefaultDelayValue, selectedElement, selectedElementId, updateElement])

  return (
    <>
      <Text fontWeight="semibold" fontSize={['sm', 'md']}>
        {'Delay Element'}
      </Text>
      <Divider />
      <Grid templateRows={'20px 1fr'} gap="2" w="100%">
        <GridItem w="100%" h="8px" alignItems="center" justifyContent="center">
          <Text fontSize={['xs', 'sm', 'md']}>Duration (ms)</Text>
        </GridItem>
        <GridItem w="100%">
          <Flex gap={['4px']} alignItems="center" justifyContent="space-around">
            <Input
              type="number"
              variant="brand"
              borderColor="gray.400"
              value={delayDuration}
              onChange={onDelayDurationChange}
            />
          </Flex>
        </GridItem>
      </Grid>
      <Button
        variant="brand"
        w="fit-content"
        onClick={resetDuration}
      >
        Set to Default
      </Button>
    </>
  )
}
