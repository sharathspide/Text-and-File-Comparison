document.getElementById('compare').addEventListener('click', compareFiles);
document.getElementById('compare2').addEventListener('click', compareText);

function compareFiles() {
    const file1 = document.getElementById('file1').files[0];
    const file2 = document.getElementById('file2').files[0];

    if (file1 && file2) {
        Promise.all([file1.text(), file2.text()]).then(values => {
            const [text1, text2] = values;
            const result = diff(text1, text2);
            document.getElementById('result').innerHTML = result;
        });
    } else {
        alert('Please select both files.');
    }
}

function compareText() {
     // Get the input element by ID
     const inputElement1 = document.getElementById('text1');
     const inputElement2 = document.getElementById('text2');
    
     // Get the value of the input element
     const file1 = inputElement1.value;
     const file2 = inputElement2.value;
    // const file1 = document.getElementById('text1');
    // const file2 = document.getElementById('text2');
    if (file1 && file2) {
        // Promise.all([file1.text(), file2.text()]).then(values => {
            // const [text1, text2] = values;
            // const result = diff(text1, text2);
            // document.getElementById('result').innerHTML = result;
        // });
        const result = diff(file1, file2);
        document.getElementById('result2').innerHTML = result;
    } else {
        alert('Please select both files.');
    }
}


function diff(text1, text2) {
    const dmp = new diff_match_patch();
    const diff = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diff);

    let html = '';
    diff.forEach(part => {
        const [operation, data] = part;
        const type = operation === 1 ? 'diff-added' : operation === -1 ? 'diff-removed' : '';
        html += `<span class="${type}">${escapeHtml(data)}</span>`;
    });

    return html;
}

function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"']/g, m => 
        ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', "'": '&#039;' })[m]
    );
}

// Include the diff_match_patch library in the HTML or fetch from CDN
