// import { describe, expect, test, vi } from 'vitest'
import { setupMultipleApiDataProcess, type MultipleApiDataProcess } from '../../../domain/features/multiple-api-data-process'
import { apiFake1 } from '../../mocks/fake-api-1'
import { apiFake2 } from '../../mocks/fake-api-2'
import { describe, test, expect, vi} from 'vitest'
import type { Api1Provider, Api2Provider } from '../../../domain/contracts'

type MakeSutResponse = {
  sut: MultipleApiDataProcess
  providers: {
    api1Provider: Api1Provider;
    api2Provider: Api2Provider;
  }
}
const makeSut = (): MakeSutResponse => {
  const providers = {
    api1Provider: vi.fn(apiFake1),
    api2Provider: vi.fn(apiFake2)
  }

  const sut = setupMultipleApiDataProcess({
    api1Provider: providers.api1Provider,
    api2Provider: providers.api2Provider
  })
  return {
    sut,
    providers
  }
}

describe("MultipleApiDataProcessService", () => {
  test("should calls Api1Provider with the right parameters", async () => {
    const fakeData = {
      id: 'valid-one',
      name: "valid-one"
    }
    const { sut, providers } = makeSut()
    await sut(fakeData)
    expect(providers.api1Provider).toHaveBeenCalledTimes(1)
    expect(providers.api1Provider).toHaveBeenCalledWith({ name: fakeData.name })
  })
})