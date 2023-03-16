import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  normalisedName: string
}

const Profile = ({
  normalisedName,
}: Props) => {
  const { t } = useTranslation('register')

  const backRef = useRef<HTMLButtonElement>(null)
  return (
    <>
    </>
  )
}

export default Profile