module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'doc', 'release', 'chore', 'test']],
        'type-case': [2, 'always', 'lower-case']
    }
};
