//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const OPEN_ALERT = 'OPEN_ALERT';
export type OPEN_ALERT = typeof OPEN_ALERT;

export interface OpenAlert {
    type: OPEN_ALERT;
    alertId: number;
}

export function openAlert(alertId: number): OpenAlert {
    return {type: OPEN_ALERT, alertId};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_ALERT = 'CLOSE_ALERT';
export type CLOSE_ALERT = typeof CLOSE_ALERT;

export interface CloseAlert {
    type: CLOSE_ALERT;
    alertId: number;
}

export function closeAlert(alertId: number): CloseAlert {
    return {type: CLOSE_ALERT, alertId};
}

export type AlertAction = OpenAlert | CloseAlert;