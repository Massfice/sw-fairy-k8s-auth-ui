const openWindowHandler = (
    url: string,
    width: number,
    height: number,
    onClose: () => void,
    props: Record<string, unknown> = { resizable: true, scrollbars: 'yes', status: 'yes' },
): Window => {
    props.width = width;
    props.height = height;
    props.left = screen.width / 2 - width / 2;
    props.top = screen.height / 2 - height / 2;

    const windowProps: string = Object.keys(props)
        .map((key: string) => `${key}=${props[key]}`)
        .join(',');

    const openedWindow = window.open(url, null, windowProps);

    const interval = setInterval(() => {
        if (!openedWindow.closed) {
            return;
        }

        clearInterval(interval);
        onClose();
    }, 50);

    return openedWindow;
};

export default openWindowHandler;
