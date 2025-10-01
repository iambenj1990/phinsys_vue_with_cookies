import { useUserStore } from 'stores/userStore'

export default async () => {
  const userStore = useUserStore()
  await userStore.authenticatedUserCheck()
}
