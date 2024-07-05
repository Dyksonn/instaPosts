declare interface IPostDetail {
    visible: boolean;
    id: number|null;
    onClose: () => void;
    isPin: boolean;
}