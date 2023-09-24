// export function debounce(delay: number = 300): MethodDecorator {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//       const timeoutKey = Symbol();

//       const original = descriptor.value;

//       descriptor.value = function (...args) {
//         clearTimeout(this[timeoutKey]);
//         this[timeoutKey] = setTimeout(() => original.apply(this, args), delay);
//       };

//       return descriptor;
//     };
//   }


export function ngDebounce(timeout: number) {
  // store timeout value for cancel the timeout
  let timeoutRef:any;

  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    // store original function for future use
    const original = descriptor.value;

    // override original function
    descriptor.value = function(...args: any) {

      // clear previous timeout
      clearTimeout(timeoutRef);

      // sechudle timer
      timeoutRef = setTimeout(() => {

        // call original function
        original.apply(this, args);

      }, timeout);
    }

    // return descriptor with new value
    return descriptor;
  }
}
