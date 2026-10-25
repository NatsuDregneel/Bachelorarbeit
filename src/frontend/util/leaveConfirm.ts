import { reactive } from 'vue'

export const leaveDialog = reactive({ visible: false })

let resolver: ((leave: boolean) => void) | null = null

/** opens the dialog and resolves with true (leave) or false (stay) */
export function askToLeave(): Promise<boolean> {
    resolver?.(false)   // a dialog that is still open counts as cancelled
    leaveDialog.visible = true
    return new Promise(resolve => { resolver = resolve })
}

/** called by the dialog buttons */
export function answerLeave(leave: boolean): void {
    leaveDialog.visible = false
    resolver?.(leave)
    resolver = null
}