'use server'
import { ISettingInput } from '@/types'
import data from '../data'
import Setting from '../db/models/setting.model'
import { connectToDatabase } from '../db'
import { formatError } from '../utils'
import { cookies } from 'next/headers'
import { SettingInputSchema } from '../validator'

const globalForSettings = global as unknown as {
  cachedSettings: ISettingInput | null
}
export const getNoCachedSetting = async (): Promise<ISettingInput> => {
  await connectToDatabase()
  const setting = await Setting.findOne()
  return JSON.parse(JSON.stringify(setting)) as ISettingInput
}

export const getSetting = async (): Promise<ISettingInput> => {
  if (!globalForSettings.cachedSettings) {
    await connectToDatabase()
    const setting = await Setting.findOne().lean()
    globalForSettings.cachedSettings = setting
      ? JSON.parse(JSON.stringify(setting))
      : data.settings[0]
  }
  return globalForSettings.cachedSettings as ISettingInput
}

// lib/setting.actions.ts
export const updateSetting = async (newSetting: ISettingInput) => {
  try {
    // Validate the input using SettingInputSchema
    const validatedSetting = SettingInputSchema.parse(newSetting)
    console.log('Validated setting:', JSON.stringify(validatedSetting, null, 2))

    await connectToDatabase()
    const updatedSetting = await Setting.findOneAndUpdate(
      {},
      validatedSetting,
      {
        upsert: true,
        new: true,
      }
    ).lean()
    globalForSettings.cachedSettings = JSON.parse(
      JSON.stringify(updatedSetting)
    )
    return {
      success: true,
      message: 'Setting updated successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export const setCurrencyOnServer = async (newCurrency: string) => {
  'use server'
  const cookiesStore = await cookies()
  cookiesStore.set('currency', newCurrency)

  return {
    success: true,
    message: 'Currency updated successfully',
  }
}
