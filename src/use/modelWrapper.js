import { computed } from 'vue'

// wrapper for modelValue
export function useModelWrapper(props, emit, name = 'modelValue') {
    return computed({
        get: () => props[name],
        set: (value) => emit(`update:${name}`, value)
    })
}