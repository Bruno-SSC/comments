import { focusable_object } from './interfaces';

export default class KeyNavigation {
  public static tabindex_count: number = 0;
  private static all_elements: focusable_object[] = [];
  private static active_index: number = -1;

  static init() {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      e.preventDefault(); // prevent default focus switch
      KeyNavigation.handle_keys(e);
    });
  }

  static add_element(confirm: () => void, cancel: () => void): number {
    const new_el = {
      tabindex: KeyNavigation.tabindex_count,
      confirm,
      cancel,
    };

    KeyNavigation.all_elements.push(new_el);
    KeyNavigation.tabindex_count += 1;
    return new_el.tabindex;
  }

  static remove_element(tag: string) {
    const index = KeyNavigation.all_elements.findIndex((el) => el.tag === tag);
    KeyNavigation.all_elements.splice(index, 1);
  }

  static handle_keys(e: KeyboardEvent) {
    const range = KeyNavigation.all_elements.length;

    if (e.key == 'Tab') KeyNavigation.active_index += 1;
    if (KeyNavigation.active_index > range - 1) KeyNavigation.active_index = 0;
    if (e.key == 'Shift') KeyNavigation.active_index -= 1;
    if (KeyNavigation.active_index < 0) KeyNavigation.active_index = range - 1;

    const curr_focus = KeyNavigation.all_elements[KeyNavigation.active_index];

    const selected = document.querySelector(
      `[tabindex="${curr_focus.tabindex}"]`
    ) as HTMLElement;

    selected.focus();

    if (e.key == 'Enter') curr_focus.confirm();
    if (e.key == 'Backspace') curr_focus.cancel();
  }

  static update_focus() {
    // TODO: use it to change the focused element manually
  }
}
