export default interface IEntry {
    date: string;
    content: string;
    keyEvent: string;
    mood: string;
    remarks: string;
}

// Legacy Entry type used by the old API
export interface ILegacyEntry {
    date: string;
    content: string;
    keyword: string;
    mood: string;
    remarks: string;
}