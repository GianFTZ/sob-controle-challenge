// import { describe, expect, test, vi } from 'vitest'
import { setupMultipleApiDataProcess, type MultipleApiDataProcess } from '../../../domain/features/multiple-api-data-process'
import { apiFake1 } from '../../mocks/fake-api-1'
import { apiFake2 } from '../../mocks/fake-api-2'
import { describe, test, expect, vi, type Mock } from 'vitest'
import type { Api1Provider, Api1Response, Api2Provider, Api2ProviderResponse } from '../../../domain/contracts'

type MakeSutResponse = {
  sut: MultipleApiDataProcess
  providers: {
    api1Provider: Mock<[props: {
      name: string;
    }], Promise<Api1Response>>;
    api2Provider: Mock<[props: {
      id: string;
    }], Promise<Api2ProviderResponse>>
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
      name: "valid-one"
    }
    const { sut, providers } = makeSut()
    providers.api1Provider
    await sut(fakeData)
    expect(providers.api1Provider).toHaveBeenCalledTimes(1)
    expect(providers.api1Provider).toHaveBeenCalledWith({ name: fakeData.name })
  })
})