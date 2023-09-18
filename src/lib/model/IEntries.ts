import type IEntry from "./IEntry";

export default interface IEntries {
    [date: string]: IEntry;
}