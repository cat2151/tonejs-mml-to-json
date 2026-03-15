import { clamp } from './tone-edit-helpers.js';
function getElement(id) {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`Element #${id} not found`);
    }
    return el;
}
export function renderParameters(containerId, defs, values, onChange) {
    const container = getElement(containerId);
    container.innerHTML = '';
    defs.forEach((def) => {
        const row = document.createElement('label');
        row.className = 'param-row';
        const span = document.createElement('span');
        span.textContent = def.label;
        if (def.choices && def.choices.length > 0) {
            // Enum parameter: render a <select>
            const select = document.createElement('select');
            def.choices.forEach((choice) => {
                const option = document.createElement('option');
                option.value = choice;
                option.textContent = choice;
                option.selected = choice === values[def.path];
                select.appendChild(option);
            });
            select.addEventListener('change', () => {
                values[def.path] = select.value;
                onChange(def.path, select.value);
            });
            row.append(span, select);
        }
        else if (def.numericChoices && def.numericChoices.length > 0) {
            // Discrete numeric parameter: render a <select>
            const select = document.createElement('select');
            def.numericChoices.forEach((choice) => {
                const option = document.createElement('option');
                option.value = String(choice);
                option.textContent = String(choice);
                option.selected = choice === values[def.path];
                select.appendChild(option);
            });
            select.addEventListener('change', () => {
                const num = Number.parseFloat(select.value);
                values[def.path] = num;
                onChange(def.path, num);
            });
            row.append(span, select);
        }
        else {
            // Numeric parameter: render a number <input>
            row.title = `sweet: ${def.sweetMin} - ${def.sweetMax}`;
            const input = document.createElement('input');
            input.type = 'number';
            input.min = String(def.min);
            input.max = String(def.max);
            input.step = def.step ? String(def.step) : '0.01';
            input.value = (values[def.path] ?? def.defaultValue).toString();
            input.addEventListener('input', () => {
                const parsed = Number.parseFloat(input.value);
                if (!Number.isFinite(parsed)) {
                    return;
                }
                const clamped = clamp(parsed, def.min, def.max);
                values[def.path] = clamped;
                input.value = clamped.toString();
                onChange(def.path, clamped);
            });
            row.append(span, input);
        }
        container.appendChild(row);
    });
}
//# sourceMappingURL=tone-edit-render.js.map