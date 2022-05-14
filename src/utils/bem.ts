function genBem(name: string, mods?: Mods): string {
  if (!mods) return ''

  if (typeof mods === 'string')
    return ` ${name}--${mods}`

  if (Array.isArray(mods))
    return mods.reduce<string>((ret, item) => ret + genBem(name, item), '')

  return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? genBem(name, key) : ''), '')
}

export type Mod = string | Record<string, any>
export type Mods = Mod | Mod[]

/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
export function BEM(name: string) {
  return (el?: Mods, mods?: Mods): Mods => {
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }

    el = el ? `${name}__${el}` : name

    return `${el}${genBem(el, mods)}`
  }
}

export function createBEM(name: string) {
  const prefixedName = `bem-${name}`
  return [prefixedName, BEM(prefixedName)] as const
}
