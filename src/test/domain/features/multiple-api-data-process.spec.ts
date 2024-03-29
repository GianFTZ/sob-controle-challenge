import { setupMultipleApiDataProcess, type MultipleApiDataProcess } from '../../../domain/features/multiple-api-data-process'
import { apiFake1 } from '../../mocks/fake-api-1'
import { apiFake2 } from '../../mocks/fake-api-2'
import { describe, test, expect, vi, type Mock } from 'vitest'
import type { Api1ProviderResponse, Api2ProviderResponse, Api3ProviderProps, LocalCalcProviderProps } from '../../../domain/contracts'
import { calculoLocal } from '../../mocks/fake-local-calc'
import { apiFake3 } from '../../mocks/fake-api-3'
import { alertaObservabilidade } from '../../mocks/fake-alerta-observabilidade'
import { errorHandler, type ErrorHandlerProps } from '../../../utils'

type MakeSutResponse = {
  sut: MultipleApiDataProcess
  providers: {
    api1Provider: Mock<[props: {
      name: string;
    }], Promise<Api1ProviderResponse>>
    api2Provider: Mock<[props: {
      id: string;
    }], Promise<Api2ProviderResponse>>
    localCalcProvider: Mock<[props: LocalCalcProviderProps], boolean>
    api3Provider: Mock<[props: Api3ProviderProps], Promise<void>>
    alertaObservabilidadeProvider: Mock<[props: {
      id: string;
    }], Promise<boolean>>,
    errorHandler:  Mock<[ErrorHandlerProps], void>
  }
}
const makeSut = (): MakeSutResponse => {
  const providers = {
    api1Provider: vi.fn(apiFake1),
    api2Provider: vi.fn(apiFake2),
    localCalcProvider: vi.fn(calculoLocal),
    api3Provider: vi.fn(apiFake3),
    alertaObservabilidadeProvider: vi.fn(alertaObservabilidade),
    errorHandler: vi.fn(errorHandler)
  }

  const sut = setupMultipleApiDataProcess({
    ...providers,
    localCalc: providers.localCalcProvider
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
    await sut(fakeData)
    expect(providers.api1Provider).toHaveBeenCalledTimes(1)
    expect(providers.api1Provider).toHaveBeenCalledWith({ name: fakeData.name })
  })

  test("should calls Api2Provider with the right parameters", async () => {
    const fakeData = {
      name: "valid-one"
    }
    const { sut, providers } = makeSut()
    providers.api1Provider.mockResolvedValueOnce({ id: "123", name: "valid-name" })
    await sut(fakeData)
    expect(providers.api2Provider).toHaveBeenCalledTimes(1)
    expect(providers.api2Provider).toHaveBeenCalledWith({ id: "123" })
  })

  test("should calls LocalCalcProvider with the right parameters", async () => {
    const fakeData = {
      name: "valid-one"
    }
    const { sut, providers } = makeSut()
    providers.api1Provider.mockResolvedValueOnce({ id: "123", name: "valid-name" })
    providers.api2Provider.mockResolvedValueOnce({ dataNascimento: "valid-birth-date" })
    await sut(fakeData)
    expect(providers.localCalcProvider).toHaveBeenCalledTimes(1)
    expect(providers.localCalcProvider).toHaveBeenCalledWith({ id: "123", name: "valid-name", dataNascimento: "valid-birth-date" })
  })

  test("should calls Api3Provider with the right parameters", async () => {
    const fakeData = {
      name: "valid-one"
    }
    const { sut, providers } = makeSut()
    providers.api1Provider.mockResolvedValueOnce({ id: "123", name: "valid-name" })
    providers.api2Provider.mockResolvedValueOnce({ dataNascimento: "valid-birth-date" })
    providers.localCalcProvider.mockResolvedValueOnce(true)
    await sut(fakeData)
    expect(providers.api3Provider).toHaveBeenCalledTimes(1)
    expect(providers.api3Provider).toHaveBeenCalledWith({ id: "123", isBirthDay: true })
  })

  test("should returns NotFound if Api1Provider returns 555", async () => {
    const fakeData = {
      name: "valid-one"
    }
    const { sut, providers } = makeSut()

    providers.api1Provider.mockResolvedValueOnce({ id: "555", name: "valid-name" })
    const res = await sut(fakeData)
    expect(res).toBe("NotFound")
  })

  test("should returns CorruptedData if Api1Provider returns 999", async () => {
    const fakeData = {
      name: "valid-one"
    }
    const { sut, providers } = makeSut()

    providers.api1Provider.mockResolvedValueOnce({ id: "999", name: "valid-name" })
    const res = await sut(fakeData)
    expect(res).toBe("CorruptedData")
    expect(providers.alertaObservabilidadeProvider).toHaveBeenCalled()
  })

  test("should returns InternalError if Api1Provider returns 780", async () => {
    const fakeData = {
      name: "valid-one"
    }
    const { sut, providers } = makeSut()

    providers.api1Provider.mockResolvedValueOnce({ id: "780", name: "valid-name" })
    const res = await sut(fakeData)
    expect(res).toBe("InternalError")
    expect(providers.alertaObservabilidadeProvider).toHaveBeenCalled()
  })

  test("should returns TimedOut if Api1Provider returns 000", async () => {
    const fakeData = {
      name: "valid-one"
    }
    const { sut, providers } = makeSut()

    providers.api1Provider.mockResolvedValueOnce({ id: "000", name: "valid-name" })
    const res = await sut(fakeData)
    expect(res).toBe("TimedOut")
  })

  test("should returns Unknown if Api1Provider returns XXX", async () => {
    const fakeData = {
      name: "valid-one"
    }
    const { sut, providers } = makeSut()

    providers.api1Provider.mockResolvedValueOnce({ id: "X?X", name: "valid-name" })
    const res = await sut(fakeData)
    expect(res).toBe("Unknown")
  })

  test("should returns Success", async () => {
    const fakeData = {
      name: "valid-one"
    }
    const { sut, providers } = makeSut()

    providers.api1Provider.mockResolvedValueOnce({ id: "123", name: "valid-name" })
    const res = await sut(fakeData)
    expect(res).toBe("Success")
  })
})