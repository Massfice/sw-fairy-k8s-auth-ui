export default interface NotifyHandler<T> {
    dependency: T;
    notify: (dependency: T) => void;
}
