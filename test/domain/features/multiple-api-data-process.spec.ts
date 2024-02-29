import { describe } from 'vitest'
import { setupMultipleApiDataProcess } from '../../../src/domain/features/multiple-api-data-process'

type MakeSutResponse = {}
const makeSut = (): MakeSutResponse => {
  const sut = setupMultipleApiDataProcess()
  return {}
}

describe("MultipleApiDataProcessService", () => {}) 