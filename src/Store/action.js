const action = (target, name, descriptor) => {
  if (descriptor.initializer) {
    const originalInitializer = descriptor.initializer
    descriptor.initializer = function () {
      const originalMethod = originalInitializer.apply(this);
      return this.$updateWrapper(originalMethod)
    }
  } 
  
  // TODO for class methods without class propperties plugin
  // else {
  //   const originalMethod = descriptor.value
  //   descriptor.value = function (...args) {
  //     if(wrappedMethod === null){
  //       wrappedMethod = this.$updateWrapper(originalMethod)
  //     }
  //     return wrappedMethod(...args)
  //   }
  // }
}


export default action
