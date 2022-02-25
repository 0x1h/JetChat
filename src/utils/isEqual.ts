export const isEqual = <T>(obj1: T, obj2: T): boolean => {
  const obj1Values: string[] = Object.values(obj1)
  const obj2Values: string[] = Object.values(obj2)

  if (obj1Values.length !== obj2Values.length) return false

  for (let i = 0; i < obj1Values.length; i++) {
    if (obj1Values[i].trim() !== obj2Values[i].trim()) return false
  }

  return true
}