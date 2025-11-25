import { useEffect, type ReactNode } from 'react';
import { Bell } from "lucide-react";

type DialogType = "leaveBooking" | "timeout";


interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    type: DialogType;
    confirmText?: string;
    cancelText?: string;
}

const dialogs: Record<DialogType, {
    title: string;
    question: ReactNode;
    details: string[];
    buttonLayout: "confirm-cancel" | "single-confirm";
}> = {
    leaveBooking: {
        title: "Hủy đơn hàng?",
        question: "Bạn có chắc chắn muốn tiếp tục?",
        details: [
            "Bạn sẽ mất vị trí mình đã lựa chọn.",
            "Đơn hàng đang trong quá trình thanh toán hoặc đã thanh toán thành công cũng có thể bị huỷ."
        ],
        buttonLayout: "confirm-cancel",
    },
    timeout: {
        title: "Hết thời gian giữ vé!",
        question: <Bell className="w-16 h-16 text-yellow-500 mx-auto" />,
        details: [
            "Đã hết thời gian giữ vé. Vui lòng đặt lại vé mới."
        ],
        buttonLayout: "single-confirm",
    },
};

const ConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    type,
    confirmText = "Hủy đơn",
    cancelText = "Ở lại",
}: ConfirmationDialogProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const { title, question, details, buttonLayout } = dialogs[type];

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 text-center">
                        <h3 className="font-bold text-xl text-gray-800 mb-3">{title}</h3>
                        <div className="text-gray-600 mb-4">{question}</div>
                        <ul className="text-gray-600 mb-6 text-left list-disc list-inside space-y-1">
                            {details.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center items-center gap-4 mt-8">
                            {buttonLayout === "confirm-cancel" && (
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2.5 rounded-md bg-white text-red-500 border border-red-500 font-semibold hover:bg-red-50 transition-colors"
                                >
                                    {cancelText}
                                </button>
                            )}
                            <button
                                onClick={onConfirm}
                                className={`flex-1 px-4 py-2.5 rounded-md bg-[#2dc275] text-white font-semibold hover:bg-green-700 transition-colors ${buttonLayout === 'single-confirm' ? 'w-full' : ''}`}
                            >
                                {buttonLayout === 'single-confirm' ? "Đặt vé mới" : confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmationDialog;