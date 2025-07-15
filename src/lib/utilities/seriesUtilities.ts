/**
 * Utility class for detecting and extracting series information from entry content
 */
export class SeriesUtilities {
    /**
     * Extracts series name from content if it exists
     * @param content The entry content to analyze
     * @returns The series name if found, null otherwise
     */
    static getSeries(content: string): string | null {
        // If the content is prefixed like '[some series name] content',
        // extract the series name
        const seriesRegex = /^\[(.+)\] (.+)$/;
        const match = seriesRegex.exec(content);
        if (match) {
            return match[1];
        }
        return null;
    }

    /**
     * Removes series prefix from content text
     * @param content The entry content to clean
     * @returns The content with series prefix removed
     */
    static removeSeriesFromContent(content: string): string {
        const seriesRegex = /^\[(.+)\] (.+)$/;
        const match = seriesRegex.exec(content);
        if (match) {
            return match[2];
        }
        return content;
    }

    /**
     * Checks if content contains a series prefix
     * @param content The entry content to check
     * @returns True if content has series prefix, false otherwise
     */
    static hasSeries(content: string): boolean {
        return this.getSeries(content) !== null;
    }
}