const { ClickUpService } = require('./dist/services/clickup.service.js');
const fs = require('fs');

async function test() {
    const service = new ClickUpService();
    try {
        const hierarchy = await service.getWorkspaceHierarchy('90132645314');
        fs.writeFileSync('hierarchy.json', JSON.stringify(hierarchy, null, 2));
        console.log('Hierarchy saved to hierarchy.json');
    } catch (error) {
        console.error('Error fetching hierarchy:', error);
    }
}

test();
