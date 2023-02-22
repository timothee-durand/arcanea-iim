export default {
    data() {
        return {
            lastScrollYOffset: 0,
            lastScrollXOffset: 0
        }
    },
    methods: {
        /**
         *
         * @author tristanseclet@icloud.com
         * */
        onMouseMove() {
            window.addEventListener('mousemove', (e) => {
                this.target.x = e.clientX;
                this.target.y = e.clientY + window.pageYOffset;

            });
        },

        /**
         * @author tristanseclet@icloud.com
         * */
        onScrollMove() {
            window.addEventListener('scroll', () => {
                this.target.y += window.pageYOffset - this.lastScrollYOffset;
                this.lastScrollYOffset = window.pageYOffset;

                this.target.x += window.pageXOffset - this.lastScrollXOffset;
                this.lastScrollXOffset = window.pageXOffset;

            });
        },
        /**
         * @param container (this.container)
         * @author tristanseclet@icloud.com
         **/
        setViewportSize(container) {
            /**
             * The viewport corresponds to the canvas of the scene (container)
             * the width of the viewport must always be initialized to the width of the screen (container.clientWidth)
             * the height of the viewport must always be set to the height of the screen (container.clientHeight)
             **/

            const width = container.clientWidth;
            const height = container.clientHeight;
            const aspectRatio = width / height;

            return {
                width,
                height,
                aspectRatio,
            };

        },
    },

};
