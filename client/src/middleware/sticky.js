const Sticky = {    
    bind(el, binding) {
        setStyle(el, binding.value);
    },
    componentUpdated(el, binding) {
        setStyle(el, binding.value);
    },
};

const setStyle = (el, values) => {
    const defaults = {
        isSticky: true,
        offset: 80,
    };
    
    const isSticky = values && values.isSticky !== undefined
        ? values.isSticky
        : defaults.isSticky;

    if (isSticky) {
        const offset = values && values.offset || defaults.offset;

        el.style.top = `${offset}px`;
        el.style.position = 'sticky';
        el.style.position = '-webkit-sticky'; /* Safari */
    } else {
        el.style.cssText = null;
    }
};

const _Sticky = Sticky;
export { _Sticky as Sticky };
