
interface DividerProps {
    text: string
}
export function Divider(
    { text }: DividerProps
) {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-center w-full my-4 space-x-4">
                <div className="h-px flex-1 bg-muted" />
                <span className="text-sm font-medium text-muted-foreground">{text}</span>
                <div className="h-px flex-1 bg-muted" />
            </div>
        </div>
    )
}