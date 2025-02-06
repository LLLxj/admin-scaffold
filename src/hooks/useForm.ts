import { useLocale } from '@/hooks'

export const useForm = () => {
  const { t } = useLocale()

  const statusOptions = [
    {
      label: t('enabled'),
      value: true
    },
    {
      label: t('disabled'),
      value: false
    }
  ]

  return {
    statusOptions
  }
}