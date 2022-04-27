import { mount } from "@vue/test-utils";
import TestingComponent from "../../resources/js/components/TestingComponent";

test('displays headline', () => {
    const wrapper = mount(TestingComponent, {
        propsData: {
            headline: 'Hello Test!'
        }
    });

    expect(wrapper.text()).toContain('Hello Test!');
})
