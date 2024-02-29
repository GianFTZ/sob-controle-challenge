import { describe } from 'vitest'
import { setupMultipleApiDataProcess } from '../../../src/domain/features/multiple-api-data-process'
import { apiFake1 } from '../../mocks/fake-api-1'
import { apiFake2 } from '../../mocks/fake-api-2'

type MakeSutResponse = {}
const makeSut = (): MakeSutResponse => {
  const sut = setupMultipleApiDataProcess({
    api1Provider: apiFake1,
    api2Provider: apiFake2
  })
  return {}
}

describe("MultipleApiDataProcessService", () => {})