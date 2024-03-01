
export const Variants1 = {
    hidden: {
        x: "-40",
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1
        }
    }
}

export const Variants2 = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.7,
            duration: 0.7
        }
    }
}

export const fadeInAnimationVariantsSide = {
    initial: {
     opacity: 0,
     x: 20,
    },
    animate: (index) => ({
     opacity: 1,
     x: 0,
     transition: {
       delay: 0.1 * index,
     }
    }),
  }

