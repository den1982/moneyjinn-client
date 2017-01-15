export class UserSettings {
  private settingDateFormat: string;
  private settingDisplayedLanguage: number;

  getSettingDateFormat(): string {
    return this.settingDateFormat;
  }

  setSettingDateFormat(dateFormat: string) {
    this.settingDateFormat = dateFormat;
  }

  getSettingDisplayedLanguage(): number {
    return this.settingDisplayedLanguage;
  }

  setSettingDisplayedLanguage(displayedLanguage: number) {
    this.settingDisplayedLanguage = displayedLanguage;
  }
}
