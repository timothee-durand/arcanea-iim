import {onMounted, reactive, ref} from "vue";

export type ViewPort = {
    width: number;
    aspectRatio: number;
    height: number
};

export function useThreeHelpers() {
    const target = reactive({x: 0, y: 0});

    const onMouseMove = () => {
        window.addEventListener('mousemove', (e) => {
            target.x = e.clientX;
            target.y = e.clientY;
        });
    };

    const setViewportSize: (container: HTMLCanvasElement) => ViewPort = (container: HTMLCanvasElement) => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        const aspectRatio = width / height;

        return {
            width,
            height,
            aspectRatio,
        };
    };

    onMounted(() => {
        onMouseMove();
    })


    return {
        setViewportSize,
        target,
    }

}
