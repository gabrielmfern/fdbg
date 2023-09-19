declare global {
  /**
   * @description `console.log`'s the `el` then returns it
   *
   * This function is inspired in Rust's `dbg!` macro.
   */
  function dbg<T = any>(el: T, context?: string): T;
}

function isInBrowser() {
  return typeof window !== 'undefined';
}

const _global = typeof window !== 'undefined' ? window : global;

if (isInBrowser()) {
  _global.dbg = function <T = any>(el: T, context?: string): T {
    if (context) {
      console.groupCollapsed(`${context}:`, el);
    } else {
      console.groupCollapsed(el);
    }
    console.trace('for this dbg() call');
    console.groupEnd();
    return el;
  };
} else {
  _global.dbg = function <T = any>(el: T): T {
    console.debug(el);
    return el;
  };
}

