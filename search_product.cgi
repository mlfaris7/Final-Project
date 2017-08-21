#!/usr/local/bin/python3

import cgi, json
import os
import mysql.connector

def main():
    print("Content-Type: application/json\n\n")
    form = cgi.FieldStorage()
    term = form.getvalue('search_term')
        
    conn = mysql.connector.connect(user='mfaris1', password='password', host='localhost', database='mfaris1_chado')
    cursor = conn.cursor()
    
    qry = """
          SELECT f.uniquename, product.value, f.residues
            FROM feature f
		JOIN cvterm polypeptide ON f.type_id=polypeptide.cvterm_id
		JOIN featureprop product ON f.feature_id=product.feature_id
		JOIN cvterm productprop ON product.type_id=productprop.cvterm_id
           WHERE product.value LIKE %s LIMIT 5 
    """
    cursor.execute(qry, ('%' + term + '%', ))

    results = { 'match_count': 0, 'matches': list() }
    for (uniquename, product,residues) in cursor:
        results['matches'].append({'uniquename': uniquename.decode('utf-8'), 'product': product.decode('utf-8'), 'residues': residues.decode('utf-8')})
        results['match_count'] += 1

    conn.close()

    print(json.dumps(results))


if __name__ == '__main__':
    main()
