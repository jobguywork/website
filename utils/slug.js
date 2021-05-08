export const slug = (str) => {
  return str
    .replace(/[&/\\#,+()$~%.'":*؟‌?<>{}]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}
