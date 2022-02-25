const rand = () => {
  const string_length = 24

  return [...Array(string_length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join("")

}

const tokenGenerator = () => {
  return rand() 
}

module.exports = { tokenGenerator }